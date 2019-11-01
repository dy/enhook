let h, render, useMemo, useState, useEffect, lib, driver

try { lib = require('rax') } catch (e) { }
try { driver = require('driver-dom') } catch (e) { }
if (!driver) { try { driver = require('driver-universal') } catch (e) { } }
if (!driver) { try { driver = require('driver-worker') } catch (e) { } }
if (!driver) { try { driver = require('driver-weex') } catch (e) { } }
if (!driver) { try { driver = require('driver-webgl') } catch (e) { } }


if (lib) {
  h = lib.createElement
  render = (what, where) => lib.render(what, where, { driver })

  useEffect = lib.useEffect
  useState = lib.useState
  useMemo = lib.useMemo
}

export { h, render, useEffect, useState, useMemo }
