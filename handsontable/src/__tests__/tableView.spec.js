describe('TableView', () => {
  const id = 'testContainer';

  beforeEach(function() {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function() {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('scrollViewport()', () => {
    it('should not throw error after scrolling the viewport to 0, 0 (empty data)', () => {
      spec().$container[0].style.width = '400px';

      const hot1 = handsontable({
        data: [],
        height: 100
      });

      expect(() => {
        hot1.view.scrollViewport({ row: 0, col: 0 });
      }).not.toThrow();
    });

    it('should throw error after scrolling the viewport below 0 (empty data)', () => {
      spec().$container[0].style.width = '400px';

      const hot1 = handsontable({
        data: [],
        height: 100
      });

      expect(hot1.view.scrollViewport({ row: -1, col: 0 })).toBe(false);
      expect(hot1.view.scrollViewport({ row: 0, col: -1 })).toBe(false);
      expect(hot1.view.scrollViewport({ row: -1, col: -1 })).toBe(false);
    });
  });

  // TODO fix these tests - https://github.com/handsontable/handsontable/issues/1559
  describe('maximumVisibleElementWidth()', () => {
    it('should return maximum width until right edge of the viewport', () => {
      const hot = handsontable({
        startRows: 2,
        startCols: 10,
        width: 100,
        height: 100,
      });

      expect(hot.view.maximumVisibleElementWidth(0)).toBe(100);
    });

    it('should return maximum width until right edge of the viewport (excluding the scrollbar)', () => {
      const hot = handsontable({
        startRows: 10,
        startCols: 10,
        width: 100,
        height: 100,
      });

      expect(hot.view.maximumVisibleElementWidth(200)).toBeLessThan(100);
    });
  });

  describe('maximumVisibleElementHeight()', () => {
    it('should return maximum height until bottom edge of the viewport', () => {
      const hot = handsontable({
        startRows: 10,
        startCols: 2,
        width: 120,
        height: 100,
      });

      expect(hot.view.maximumVisibleElementHeight(0)).toBe(100);
    });

    it('should return maximum height until bottom edge of the viewport (excluding the scrollbar)', () => {
      const hot = handsontable({
        startRows: 10,
        startCols: 10,
        width: 120,
        height: 100,
      });

      expect(hot.view.maximumVisibleElementHeight()).toBeLessThan(100);
    });
  });

  describe('getColumnHeadersCount()', () => {
    it('should return 0 when there is no column headers rendered (`colHeaders` has `false`)', () => {
      const hot = handsontable({
        colHeaders: false,
      });

      expect(hot.view.getColumnHeadersCount(0)).toBe(0);
    });

    it('should return 1 when there is no column headers rendered (`colHeaders` has `true`)', () => {
      const hot = handsontable({
        colHeaders: true,
      });

      expect(hot.view.getColumnHeadersCount(0)).toBe(1);
    });

    it('should return the number of column headers as actually added', () => {
      const hot = handsontable({
        colHeaders: true,
        afterGetColumnHeaderRenderers(renderers) {
          renderers.length = 0;
          renderers.push((renderedColumnIndex, TH) => {
            TH.innerText = this.getColHeader(renderedColumnIndex, 0);
          });
          renderers.push((renderedColumnIndex, TH) => {
            TH.innerText = this.getColHeader(renderedColumnIndex, 1);
          });
          renderers.push((renderedColumnIndex, TH) => {
            TH.innerText = this.getColHeader(renderedColumnIndex, 2);
          });
        },
      });

      expect(hot.view.getColumnHeadersCount(0)).toBe(3);
    });
  });

  describe('getRowHeadersCount()', () => {
    it('should return 0 when there is no row headers rendered (`rowHeaders` has `false`)', () => {
      const hot = handsontable({
        rowHeaders: false,
      });

      expect(hot.view.getRowHeadersCount(0)).toBe(0);
    });

    it('should return 1 when there is no column headers rendered (`rowHeaders` has `true`)', () => {
      const hot = handsontable({
        rowHeaders: true,
      });

      expect(hot.view.getRowHeadersCount(0)).toBe(1);
    });

    it('should return the number of column headers as actually added', () => {
      const hot = handsontable({
        colHeaders: true,
        afterGetRowHeaderRenderers(renderers) {
          renderers.length = 0;
          renderers.push((renderedRowIndex, TH) => {
            TH.innerText = this.getRowHeader(renderedRowIndex, 0);
          });
          renderers.push((renderedRowIndex, TH) => {
            TH.innerText = this.getRowHeader(renderedRowIndex, 1);
          });
          renderers.push((renderedRowIndex, TH) => {
            TH.innerText = this.getRowHeader(renderedRowIndex, 2);
          });
        },
      });

      expect(hot.view.getRowHeadersCount(0)).toBe(3);
    });
  });

  describe('countRenderableColumnsInRange()', () => {
    it('should return 0 if dataset is empty', () => {
      const hot = handsontable({
        data: [],
      });

      expect(hot.view.countRenderableColumnsInRange(0, 100)).toBe(0);
      expect(hot.view.countRenderableColumnsInRange(100, 0)).toBe(0);
      expect(hot.view.countRenderableColumnsInRange(0, 0)).toBe(0);
      expect(hot.view.countRenderableColumnsInRange(1, 1)).toBe(0);
      expect(hot.view.countRenderableColumnsInRange(1, 2)).toBe(0);
    });

    it('should return count of renderable columns depends on the passed range', () => {
      const hot = handsontable({
        data: createSpreadsheetData(5, 5),
      });

      expect(hot.view.countRenderableColumnsInRange(0, 100)).toBe(5);
      expect(hot.view.countRenderableColumnsInRange(100, 0)).toBe(0);
      expect(hot.view.countRenderableColumnsInRange(0, 0)).toBe(1);
      expect(hot.view.countRenderableColumnsInRange(1, 1)).toBe(1);
      expect(hot.view.countRenderableColumnsInRange(1, 2)).toBe(2);
      expect(hot.view.countRenderableColumnsInRange(4, 5)).toBe(1);
      expect(hot.view.countRenderableColumnsInRange(1, 5)).toBe(4);
      expect(hot.view.countRenderableColumnsInRange(-1, 3)).toBe(4);
    });

    it('should return count of renderable columns depends on the passed range when some columns are hidden', () => {
      const hot = handsontable({
        data: createSpreadsheetData(5, 5),
      });

      const hidingMap = hot.columnIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding');

      hidingMap.setValueAtIndex(0, true); // Hide column that contains cells A{n}
      hidingMap.setValueAtIndex(1, true); // Hide column that contains cells B{n}
      hidingMap.setValueAtIndex(3, true); // Hide column that contains cells D{n}
      hot.render();

      expect(hot.view.countRenderableColumnsInRange(0, 100)).toBe(2);
      expect(hot.view.countRenderableColumnsInRange(100, 0)).toBe(0);
      expect(hot.view.countRenderableColumnsInRange(0, 0)).toBe(0);
      expect(hot.view.countRenderableColumnsInRange(1, 1)).toBe(0);
      expect(hot.view.countRenderableColumnsInRange(2, 2)).toBe(1);
      expect(hot.view.countRenderableColumnsInRange(0, 2)).toBe(1);
      expect(hot.view.countRenderableColumnsInRange(4, 5)).toBe(1);
      expect(hot.view.countRenderableColumnsInRange(1, 5)).toBe(2);
      expect(hot.view.countRenderableColumnsInRange(-1, 3)).toBe(1);
    });
  });

  describe('countRenderableRowsInRange()', () => {
    it('should return 0 if dataset is empty', () => {
      const hot = handsontable({
        data: [],
      });

      expect(hot.view.countRenderableRowsInRange(0, 100)).toBe(0);
      expect(hot.view.countRenderableRowsInRange(100, 0)).toBe(0);
      expect(hot.view.countRenderableRowsInRange(0, 0)).toBe(0);
      expect(hot.view.countRenderableRowsInRange(1, 1)).toBe(0);
      expect(hot.view.countRenderableRowsInRange(2, 1)).toBe(0);
    });

    it('should return count of renderable rows depends on the passed range', () => {
      const hot = handsontable({
        data: createSpreadsheetData(5, 5),
      });

      expect(hot.view.countRenderableRowsInRange(0, 100)).toBe(5);
      expect(hot.view.countRenderableRowsInRange(100, 0)).toBe(0);
      expect(hot.view.countRenderableRowsInRange(0, 0)).toBe(1);
      expect(hot.view.countRenderableRowsInRange(1, 1)).toBe(1);
      expect(hot.view.countRenderableRowsInRange(1, 2)).toBe(2);
      expect(hot.view.countRenderableRowsInRange(4, 5)).toBe(1);
      expect(hot.view.countRenderableRowsInRange(1, 5)).toBe(4);
      expect(hot.view.countRenderableRowsInRange(-1, 3)).toBe(4);
    });

    it('should return count of renderable rows depends on the passed range when some rows are hidden', () => {
      const hot = handsontable({
        data: createSpreadsheetData(5, 5),
      });

      const hidingMap = hot.rowIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding');

      hidingMap.setValueAtIndex(0, true);
      hidingMap.setValueAtIndex(1, true);
      hidingMap.setValueAtIndex(3, true);
      hot.render();

      expect(hot.view.countRenderableRowsInRange(0, 100)).toBe(2);
      expect(hot.view.countRenderableRowsInRange(100, 0)).toBe(0);
      expect(hot.view.countRenderableRowsInRange(0, 0)).toBe(0);
      expect(hot.view.countRenderableRowsInRange(1, 1)).toBe(0);
      expect(hot.view.countRenderableRowsInRange(2, 2)).toBe(1);
      expect(hot.view.countRenderableRowsInRange(0, 2)).toBe(1);
      expect(hot.view.countRenderableRowsInRange(4, 5)).toBe(1);
      expect(hot.view.countRenderableRowsInRange(1, 5)).toBe(2);
      expect(hot.view.countRenderableRowsInRange(-1, 3)).toBe(1);
    });
  });
});
