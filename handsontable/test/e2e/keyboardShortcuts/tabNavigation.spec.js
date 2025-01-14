describe('Core navigation keyboard shortcuts', () => {
  beforeEach(function() {
    this.$container = $('<div id="testContainer"></div>').appendTo('body');
    this.$container1 = $('<div id="testContainer1"></div>').appendTo('body');
    this.$container2 = $('<div id="testContainer2"></div>').appendTo('body');
  });

  afterEach(function() {
    this.$container.data('handsontable')?.destroy();
    this.$container.remove();
    this.$container1.data('handsontable')?.destroy();
    this.$container1.remove();
    this.$container2.data('handsontable')?.destroy();
    this.$container2.remove();
  });

  describe('"Tab"', () => {
    it('should activate the table, allow traversing only the first row, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: false,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: false,
        autoWrapRow: false,
      }, false, spec().$container1);

      triggerTabNavigationFromTop(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 0,0 from: 0,0 to: 0,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 0,1 from: 0,1 to: 0,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 0,2 from: 0,2 to: 0,2']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');
      triggerTabNavigationFromTop(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 0,0 from: 0,0 to: 0,0']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 0,1 from: 0,1 to: 0,1']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 0,2 from: 0,2 to: 0,2']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, allow traversing only the column headers, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: false,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: false,
        autoWrapRow: false,
      }, false, spec().$container1);

      triggerTabNavigationFromTop(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,-1 from: -1,-1 to: -1,-1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,0 from: -1,0 to: -1,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,1 from: -1,1 to: -1,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,2 from: -1,2 to: -1,2']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');
      triggerTabNavigationFromTop(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,-1 from: -1,-1 to: -1,-1']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,0 from: -1,0 to: -1,0']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,1 from: -1,1 to: -1,1']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,2 from: -1,2 to: -1,2']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, allow traversing all cells, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: false,
        autoWrapRow: true,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: false,
        autoWrapRow: true,
      }, false, spec().$container1);

      triggerTabNavigationFromTop(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 0,0 from: 0,0 to: 0,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 0,1 from: 0,1 to: 0,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 1,0 from: 1,0 to: 1,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 1,1 from: 1,1 to: 1,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');
      triggerTabNavigationFromTop(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 0,0 from: 0,0 to: 0,0']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 0,1 from: 0,1 to: 0,1']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 1,0 from: 1,0 to: 1,0']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 1,1 from: 1,1 to: 1,1']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, select the most top-start cell, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      triggerTabNavigationFromTop(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 0,0 from: 0,0 to: 0,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');
      triggerTabNavigationFromTop(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 0,0 from: 0,0 to: 0,0']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, select the most top-start header, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      triggerTabNavigationFromTop(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,-1 from: -1,-1 to: -1,-1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');
      triggerTabNavigationFromTop(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,-1 from: -1,-1 to: -1,-1']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, reselect the recently selected cell, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      hot.selectCell(-1, 1);
      hot1.selectCell(1, -1);
      hot.deselectCell();
      hot1.deselectCell();

      triggerTabNavigationFromTop(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,1 from: -1,1 to: -1,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');
      triggerTabNavigationFromTop(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 1,-1 from: 1,-1 to: 1,-1']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, select visible cell (there are some hidden rows), and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      const map1 = hot.rowIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding', true);

      map1.setValueAtIndex(2, false);

      const map2 = hot1.rowIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding', true);

      map2.setValueAtIndex(1, false);

      hot.render();
      hot1.render();

      triggerTabNavigationFromTop(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 2,0 from: 2,0 to: 2,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');
      triggerTabNavigationFromTop(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 1,0 from: 1,0 to: 1,0']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, select header (there are no cells), and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      hot.rowIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding', true);
      hot1.rowIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding', true);

      hot.render();
      hot1.render();

      triggerTabNavigationFromTop(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,-1 from: -1,-1 to: -1,-1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp('tab');
      triggerTabNavigationFromTop(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,-1 from: -1,-1 to: -1,-1']);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, do not select any cell or header, and then leave the table (no data)', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(0, 0),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(0, 0),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      triggerTabNavigationFromTop(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
      expect(hot.isListening()).toBe(true);
      expect(hot1.isListening()).toBe(false);

      keyDownUp('tab');
      triggerTabNavigationFromTop(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
      expect(hot.isListening()).toBe(false);
      expect(hot1.isListening()).toBe(true);

      keyDownUp('tab');

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
      expect(hot.isListening()).toBe(false);
      expect(hot1.isListening()).toBe(false);
    });
  });

  describe('"Shift + Tab"', () => {
    it('should activate the table, allow traversing only the last row, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: false,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: false,
        autoWrapRow: false,
      }, false, spec().$container1);

      triggerTabNavigationFromBottom(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 2,2 from: 2,2 to: 2,2']);

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 2,1 from: 2,1 to: 2,1']);

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 2,0 from: 2,0 to: 2,0']);

      keyDownUp(['shift', 'tab']);
      triggerTabNavigationFromBottom(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 2,2 from: 2,2 to: 2,2']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 2,1 from: 2,1 to: 2,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 2,0 from: 2,0 to: 2,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, allow traversing only the column headers, and then leave the table', async() => {
      const hot = handsontable({
        data: [],
        columns: [{}, {}],
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: false,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: [],
        columns: [{}, {}],
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: false,
        autoWrapRow: false,
      }, false, spec().$container1);

      triggerTabNavigationFromBottom(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,1 from: -1,1 to: -1,1']);

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,0 from: -1,0 to: -1,0']);

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,-1 from: -1,-1 to: -1,-1']);

      keyDownUp(['shift', 'tab']);
      triggerTabNavigationFromBottom(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,1 from: -1,1 to: -1,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,0 from: -1,0 to: -1,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,-1 from: -1,-1 to: -1,-1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, allow traversing all cells, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: false,
        autoWrapRow: true,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: false,
        autoWrapRow: true,
      }, false, spec().$container1);

      triggerTabNavigationFromBottom(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 1,1 from: 1,1 to: 1,1']);

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 1,0 from: 1,0 to: 1,0']);

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 0,1 from: 0,1 to: 0,1']);

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 0,0 from: 0,0 to: 0,0']);

      keyDownUp(['shift', 'tab']);
      triggerTabNavigationFromBottom(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 1,1 from: 1,1 to: 1,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 1,0 from: 1,0 to: 1,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 0,1 from: 0,1 to: 0,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 0,0 from: 0,0 to: 0,0']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, select the most bottom-end cell, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(2, 2),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      triggerTabNavigationFromBottom(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 1,1 from: 1,1 to: 1,1']);

      keyDownUp(['shift', 'tab']);
      triggerTabNavigationFromBottom(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 1,1 from: 1,1 to: 1,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, reselect the recently selected cell, and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      hot.selectCell(-1, 1);
      hot1.selectCell(1, -1);
      hot.deselectCell();
      hot1.deselectCell();

      triggerTabNavigationFromBottom(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 1,-1 from: 1,-1 to: 1,-1']);

      keyDownUp(['shift', 'tab']);
      triggerTabNavigationFromBottom(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,1 from: -1,1 to: -1,1']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, select visible cell (there are some hidden rows), and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      const map1 = hot.rowIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding', true);

      map1.setValueAtIndex(2, false);

      const map2 = hot1.rowIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding', true);

      map2.setValueAtIndex(1, false);

      hot.render();
      hot1.render();

      triggerTabNavigationFromBottom(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: 1,2 from: 1,2 to: 1,2']);

      keyDownUp(['shift', 'tab']);
      triggerTabNavigationFromBottom(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: 2,2 from: 2,2 to: 2,2']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, select header (there are no cells), and then leave the table', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(3, 3),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: true,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      hot.rowIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding', true);
      hot1.rowIndexMapper.createAndRegisterIndexMap('my-hiding-map', 'hiding', true);

      hot.render();
      hot1.render();

      triggerTabNavigationFromBottom(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toEqualCellRange(['highlight: -1,2 from: -1,2 to: -1,2']);

      keyDownUp(['shift', 'tab']);
      triggerTabNavigationFromBottom(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toEqualCellRange(['highlight: -1,2 from: -1,2 to: -1,2']);
      expect(hot1.getSelectedRange()).toBeUndefined();

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
    });

    it('should activate the table, do not select any cell or header, and then leave the table (no data)', async() => {
      const hot = handsontable({
        data: createSpreadsheetData(0, 0),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      });
      const hot1 = handsontable({
        data: createSpreadsheetData(0, 0),
        rowHeaders: true,
        colHeaders: true,
        navigableHeaders: false,
        disableTabNavigation: true,
        autoWrapRow: false,
      }, false, spec().$container1);

      triggerTabNavigationFromBottom(hot1); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
      expect(hot.isListening()).toBe(false);
      expect(hot1.isListening()).toBe(true);

      keyDownUp(['shift', 'tab']);
      triggerTabNavigationFromBottom(); // emulates native browser Tab navigation

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
      expect(hot.isListening()).toBe(true);
      expect(hot1.isListening()).toBe(false);

      keyDownUp(['shift', 'tab']);

      expect(hot.getSelectedRange()).toBeUndefined();
      expect(hot1.getSelectedRange()).toBeUndefined();
      expect(hot.isListening()).toBe(false);
      expect(hot1.isListening()).toBe(false);
    });
  });
});
