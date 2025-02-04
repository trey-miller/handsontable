import { Page } from '@playwright/test';
import { test } from '../../src/test-runner';
import { helpers } from '../../src/helpers';

/**
 * Triggers the arrow keys events.
 *
 * @param {Page} page The instance of the Page.
 */
async function tryToEscapeFromTheComponentsFocus(page: Page) {
  // try to select another menu item using arrow keys (it should not be possible)
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowLeft');
}

/**
 * Checks whether pressing the Tab moves the focus forward within the filter's components.
 */
test(__filename, async({ page }) => {
  const table = page.locator(helpers.selectors.mainTable);

  await table.waitFor();

  const tbody = table.locator(helpers.selectors.mainTableBody);
  const cell = tbody.locator(helpers.findCell({ row: 0, column: 2, cellType: 'td' }));

  await cell.click();
  await page.keyboard.press('Alt+Shift+ArrowDown'); // trigger the dropdown menu to show up

  // take a screenshot of the dropdown menu without selecting any of the item
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the dropdown menu where the first filter's component is focused
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Enter');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter'); // select and accept "Is between" option
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the focused input after selecting and accepting the condition option
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the second focused input
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the focused radio input (And)
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the focused radio input (Or)
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the focused second filter's "by condition" component
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Enter');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter'); // select and accept "Is equal" option
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the focused input after selecting and accepting the condition option
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');

  // take a screenshot of the focused search input of the "by value" component
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the focused "Select all" link
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the focused "Clear" link
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the focused "Ok" button
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the focused "Cancel" button
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');

  // take a screenshot of the focused menu
  await page.screenshot({ path: helpers.screenshotPath() });

  await page.keyboard.press('Tab');
  await tryToEscapeFromTheComponentsFocus(page);

  // take a screenshot of the dropdown menu where the first filter's component is focused (tab order starts looping from here)
  await page.screenshot({ path: helpers.screenshotPath() });
});
