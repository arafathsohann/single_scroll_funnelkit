
(function () {
    console.log('Visual Editor Initialized');

    // State
    const state = window.__EDITOR_STATE__ || window.siteContent || {};
    window.__EDITOR_STATE__ = state; // Ensure it's globally available

    // Config
    const API_BASE = '/admin/api';

    // Helpers
    const getDeep = (obj, path) => path.split('.').reduce((o, i) => o?.[i], obj);
    const setDeep = (obj, path, value) => {
        const parts = path.split('.');
        let current = obj;
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
    };

    // UI: Toolbar
    const toolbar = document.createElement('div');
    toolbar.id = 'editor-toolbar';
    toolbar.innerHTML = `
        <div class="logo">Visual Editor</div>
        <div class="status" id="editor-status">Unsaved Changes</div>
        <div class="actions">
            <button id="btn-save-draft">Save Draft</button>
            <button id="btn-publish" class="primary">Publish</button>
            <button id="btn-exit">Exit</button>
        </div>
    `;
    document.body.appendChild(toolbar);

    // Initial Status
    const statusEl = document.getElementById('editor-status');
    let hasUnsavedChanges = false;

    const setDirty = (dirty) => {
        hasUnsavedChanges = dirty;
        statusEl.textContent = dirty ? 'Unsaved Changes*' : 'Saved';
        statusEl.style.color = dirty ? '#fbbf24' : '#34d399';
    };
    setDirty(false); // Init

    // setup elements with data-bind
    const bindElements = document.querySelectorAll('[data-bind]');

    bindElements.forEach(el => {
        const path = el.getAttribute('data-bind');

        // Avoid binding container elements that have children with bindings if possible, 
        // to prevent messing up the HTML structure when editing.
        // For Image
        if (el.tagName === 'IMG') {
            el.style.cursor = 'pointer';
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const newUrl = prompt('Enter new image URL:', el.src);
                if (newUrl) {
                    el.src = newUrl;
                    setDeep(state, path, newUrl);
                    setDirty(true);
                }
            });
        }
        // For Text
        else {
            el.contentEditable = "true";
            el.classList.add('editable-element');

            // Sync on input
            el.addEventListener('input', (e) => {
                setDeep(state, path, el.innerText); // or innerHTML? innerText is safer for plain text
                setDirty(true);
            });

            // Prevent navigating away on link clicks if editing
            el.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') e.preventDefault();
            });
        }
    });

    // Save Draft
    document.getElementById('btn-save-draft').addEventListener('click', async () => {
        statusEl.textContent = 'Saving...';
        try {
            // We need slug. Assuming it's in URL or we defaulted to 'default'.
            // Let's try to extract from path or assume 'default'
            // But better: backend should have injected slug. 
            // We'll read it from window.__PAGE_SLUG__ if available, else default.
            const slug = window.__PAGE_SLUG__ || 'default';

            const payload = {
                slug: slug,
                data: state
            };

            const res = await fetch(`${API_BASE}/draft`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setDirty(false);
                alert('Draft Saved!');
            } else {
                alert('Failed to save draft.');
            }
        } catch (e) {
            console.error(e);
            alert('Error saving draft');
        }
    });

    // Publish
    document.getElementById('btn-publish').addEventListener('click', async () => {
        if (!confirm('Are you sure you want to publish these changes live?')) return;

        statusEl.textContent = 'Publishing...';
        try {
            const slug = window.__PAGE_SLUG__ || 'default';
            const res = await fetch(`${API_BASE}/publish`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, data: state }) // Send current state
            });
            if (res.ok) {
                setDirty(false);
                alert('Published Successfully!');
            } else {
                alert('Failed to publish.');
            }
        } catch (e) {
            console.error(e);
            alert('Error publishing');
        }
    });

    document.getElementById('btn-exit').addEventListener('click', () => {
        // Go back to the page itself (or dashboard)
        // If we are at /admin/editor/slug, maybe go to /p/slug or /admin
        window.location.href = '/';
    });

})();
