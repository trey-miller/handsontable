import { autocompleteRenderer } from '../autocompleteRenderer';
import { A11Y_EXPANDED, A11Y_HASPOPUP } from '../../helpers/a11y';
import { setAttribute } from '../../helpers/dom/element';

export const RENDERER_TYPE = 'date';

/**
 * Handsontable renderer.
 *
 * @private
 * @param {Core} hotInstance The Handsontable instance.
 * @param {HTMLTableCellElement} TD The rendered cell element.
 * @param {number} row The visual row index.
 * @param {number} col The visual column index.
 * @param {number|string} prop The column property (passed when datasource is an array of objects).
 * @param {*} value The rendered value.
 * @param {object} cellProperties The cell meta object ({@see Core#getCellMeta}).
 */
export function dateRenderer(hotInstance, TD, row, col, prop, value, cellProperties) {
  autocompleteRenderer.apply(this, [hotInstance, TD, row, col, prop, value, cellProperties]);

  if (hotInstance.getSettings().ariaTags) {
    setAttribute(TD, [
      A11Y_HASPOPUP('dialog'),
      A11Y_EXPANDED('false'),
    ]);
  }
}

dateRenderer.RENDERER_TYPE = RENDERER_TYPE;
