
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

    // --- SCHEMA EDITOR MODAL logic ---

    const createModal = (title, contentCallback, onSave) => {
        const modal = document.createElement('dialog');
        modal.className = 'editor-modal';
        modal.style.cssText = `
            padding: 0;
            border: none;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            width: 90%;
            max-width: 600px;
            backdrop-filter: blur(4px);
        `;

        const container = document.createElement('div');
        container.style.cssText = 'background: white; padding: 24px; display: flex; flex-direction: column; gap: 16px; max-height: 80vh;';

        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 12px;">
                <h3 style="font-size: 1.25rem; font-weight: bold; margin: 0;">${title}</h3>
                <button id="modal-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <div id="modal-content" style="overflow-y: auto; flex: 1;"></div>
            <div style="display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid #eee; padding-top: 16px;">
                <button id="modal-cancel" style="padding: 8px 16px; border-radius: 6px; border: 1px solid #ccc; background: white; cursor: pointer;">Cancel</button>
                <button id="modal-save" style="padding: 8px 16px; border-radius: 6px; border: none; background: #2563eb; color: white; font-weight: bold; cursor: pointer;">Save Changes</button>
            </div>
        `;

        modal.appendChild(container);
        document.body.appendChild(modal);

        const contentDiv = container.querySelector('#modal-content');
        contentCallback(contentDiv);

        const close = () => {
            modal.close();
            modal.remove();
        };

        container.querySelector('#modal-close').onclick = close;
        container.querySelector('#modal-cancel').onclick = close;
        container.querySelector('#modal-save').onclick = () => {
            onSave();
            close();
        };

        modal.showModal();
    };

    const renderSchemaForm = (container, data, schemaType, onChange) => {
        // Render form based on schema type
        // schemaType examples: 'products', 'sizes', 'colors', 'shipping'

        let currentData = JSON.parse(JSON.stringify(data)); // copy

        const renderList = () => {
            container.innerHTML = '';

            // Add Button
            const addBtn = document.createElement('button');
            addBtn.textContent = '+ Add Item';
            addBtn.style.cssText = 'margin-bottom: 16px; background: #f3f4f6; border: 1px dashed #ccc; width: 100%; padding: 8px; border-radius: 6px; color: #555; cursor: pointer;';
            addBtn.onclick = () => {
                if (schemaType === 'products') {
                    currentData.push({ id: 'p' + Date.now(), name: 'New Product', price: '0', image: 'https://placehold.co/100' });
                } else if (schemaType === 'shipping') {
                    currentData.push({ label: 'New Shipping', price: '0' });
                } else {
                    currentData.push('New Option');
                }
                renderList();
                onChange(currentData);
            };
            container.appendChild(addBtn);

            currentData.forEach((item, index) => {
                const row = document.createElement('div');
                row.style.cssText = 'display: flex; gap: 10px; margin-bottom: 10px; align-items:flex-start; background: #fff; padding: 8px; border: 1px solid #eee; rounded: 4px;';

                // Fields
                const fieldsDiv = document.createElement('div');
                fieldsDiv.style.flex = '1';

                if (schemaType === 'products') {
                    fieldsDiv.innerHTML = `
                        <div style="margin-bottom: 4px;"><label style="font-size: 10px; font-weight: bold;">Name</label><input type="text" data-field="name" value="${item.name}" style="width: 100%; border: 1px solid #ddd; padding: 4px; border-radius: 4px;"></div>
                        <div style="display: flex; gap: 8px;">
                             <div style="flex: 1;"><label style="font-size: 10px; font-weight: bold;">Price</label><input type="text" data-field="price" value="${item.price}" style="width: 100%; border: 1px solid #ddd; padding: 4px; border-radius: 4px;"></div>
                             <div style="flex: 1;"><label style="font-size: 10px; font-weight: bold;">ID</label><input type="text" data-field="id" value="${item.id}" style="width: 100%; border: 1px solid #ddd; padding: 4px; border-radius: 4px;"></div>
                        </div>
                        <div style="margin-top: 4px;"><label style="font-size: 10px; font-weight: bold;">Image URL</label><input type="text" data-field="image" value="${item.image}" style="width: 100%; border: 1px solid #ddd; padding: 4px; border-radius: 4px;"></div>
                    `;
                    // Bind inputs
                    fieldsDiv.querySelectorAll('input').forEach(inp => {
                        inp.oninput = (e) => {
                            item[e.target.dataset.field] = e.target.value;
                            onChange(currentData);
                        }
                    });

                } else if (schemaType === 'shipping') {
                    fieldsDiv.innerHTML = `
                        <div style="margin-bottom: 4px;"><label style="font-size: 10px; font-weight: bold;">Label</label><input type="text" data-field="label" value="${item.label}" style="width: 100%; border: 1px solid #ddd; padding: 4px; border-radius: 4px;"></div>
                        <div style="margin-bottom: 4px;"><label style="font-size: 10px; font-weight: bold;">Price</label><input type="text" data-field="price" value="${item.price}" style="width: 100%; border: 1px solid #ddd; padding: 4px; border-radius: 4px;"></div>
                    `;
                    fieldsDiv.querySelectorAll('input').forEach(inp => {
                        inp.oninput = (e) => {
                            item[e.target.dataset.field] = e.target.value;
                            onChange(currentData);
                        }
                    });
                } else {
                    // Primitive (String)
                    const inp = document.createElement('input');
                    inp.type = 'text';
                    inp.value = item;
                    inp.style.cssText = 'width: 100%; border: 1px solid #ddd; padding: 6px; border-radius: 4px;';
                    inp.oninput = (e) => {
                        currentData[index] = e.target.value;
                        onChange(currentData);
                    };
                    fieldsDiv.appendChild(inp);
                }

                // Delete Button
                const delBtn = document.createElement('button');
                delBtn.innerHTML = '&times;';
                delBtn.style.cssText = 'background: #fee2e2; color: #ef4444; border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold;';
                delBtn.title = 'Remove Item';
                delBtn.onclick = () => {
                    currentData.splice(index, 1);
                    renderList();
                    onChange(currentData);
                };

                row.appendChild(fieldsDiv);
                row.appendChild(delBtn);
                container.appendChild(row);
            });
        };

        renderList();
    };


    // --- Setup Elements ---
    const bindElements = document.querySelectorAll('[data-bind]');

    bindElements.forEach(el => {
        const path = el.getAttribute('data-bind');
        const isComplex =
            path.endsWith('products') ||
            path.endsWith('shippingOptions') ||
            path.endsWith('sizes') ||
            path.endsWith('colors');

        if (isComplex) {
            // Setup Complex Editor
            el.style.cursor = 'pointer';
            el.style.outline = '2px dashed hsla(220, 100%, 50%, 0.3)';
            el.title = 'Click to Edit List';

            el.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Stop bubbling

                let schemaType = 'strings';
                if (path.endsWith('products')) schemaType = 'products';
                else if (path.endsWith('shippingOptions')) schemaType = 'shipping';

                const initialData = getDeep(state, path) || [];

                let tempState = initialData;

                createModal(`Edit ${schemaType}`, (container) => {
                    renderSchemaForm(container, initialData, schemaType, (newData) => {
                        tempState = newData;
                    });
                }, () => {
                    // On Save
                    setDeep(state, path, tempState);
                    setDirty(true);

                    // Auto-Save and Reload to reflect changes
                    const saveBtn = document.getElementById('btn-save-draft');
                    saveBtn.click(); // Trigger Save logic

                    // Ideally wait for save then reload, but simple trigger is okay for now.
                    // Actually, let's override save to handle this better.
                    // For now, let's just alert user to reload or reload automatically.
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                });
            });

        } else if (el.tagName === 'IMG') {
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
        } else {
            // Text Editing
            el.contentEditable = "true";
            el.classList.add('editable-element');
            el.addEventListener('input', (e) => {
                setDeep(state, path, el.innerText);
                setDirty(true);
            });
            el.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') e.preventDefault();
            });
        }
    });

    // Save Draft
    document.getElementById('btn-save-draft').addEventListener('click', async () => {
        statusEl.textContent = 'Saving...';
        try {
            const slug = window.__PAGE_SLUG__ || 'default';
            const payload = { slug, data: state };

            const res = await fetch(`${API_BASE}/draft`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setDirty(false);
                // Don't alert if triggered automatically? 
                // We can't easily detect invocation source here without more logic.
                // Keeping it simple.
                console.log('Draft Saved');
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
                body: JSON.stringify({ slug, data: state })
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
        window.location.href = '/admin/dashboard';
    });

})();
