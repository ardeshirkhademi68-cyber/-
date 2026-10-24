import test from "node:test";
import assert from "node:assert/strict";
import { replyFor } from "./app.js";

test("answers a greeting", () => {
  assert.match(replyFor("سلام ریژاو"), /خوش آمدید/);
});

test("normalizes Arabic Persian characters", () => {
  assert.match(replyFor("برنامه بازديد"), /برنامه‌ریزی بازدید/);
});

test("asks for more details on an unknown topic", () => {
  assert.match(replyFor("آب و هوا چطور است؟"), /دقیق‌تر/);
});
