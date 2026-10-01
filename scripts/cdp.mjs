#!/usr/bin/env node
// CDP helper: connect to user's Chrome (debug port 9222) and drive tapeout.net.
// Usage: node cdp.mjs <command> [args...]
//   pages                      - list open pages
//   open <url>                 - open url in new tab (or reuse existing tapeout tab)
//   eval <js>                  - run JS in the tapeout tab, print JSON result
//   shot <path>                - screenshot tapeout tab
import { chromium } from '/Users/kevin/.workbuddy/binaries/node/workspace/node_modules/playwright-core/index.mjs';

const [, , cmd, ...args] = process.argv;
const browser = await chromium.connectOverCDP('http://127.0.0.1:9222', { timeout: 120000 });
const ctx = browser.contexts()[0];

function findPage(urlPart) {
  return ctx.pages().find(p => p.url().includes(urlPart));
}

try {
  if (cmd === 'pages') {
    for (const p of ctx.pages()) console.log(p.url());
  } else if (cmd === 'open') {
    const url = args[0];
    let page = findPage('tapeout.net');
    if (!page) page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    console.log('OK', page.url());
  } else if (cmd === 'eval') {
    let page = findPage('tapeout.net');
    if (!page) { console.error('no tapeout page'); process.exit(1); }
    const result = await page.evaluate(args[0]);
    console.log(typeof result === 'string' ? result : JSON.stringify(result));
  } else if (cmd === 'shot') {
    let page = findPage('tapeout.net');
    if (!page) { console.error('no tapeout page'); process.exit(1); }
    await page.screenshot({ path: args[0], fullPage: false });
    console.log('saved', args[0]);
  } else {
    console.error('unknown command');
    process.exit(1);
  }
} catch (e) {
  console.error('ERR', e.message);
  process.exit(1);
} finally {
  browser.close(); // disconnects CDP only, keeps Chrome running
}
