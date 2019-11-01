let h, render, hooks, lib, driver

try { lib = require('rax') } catch (e) { }
try { driver = require('driver-universal') } catch (e) { }
if (!driver) { try { driver = require('driver-dom') } catch (e) { } }
if (!driver) { try { driver = require('driver-worker') } catch (e) { } }
if (!driver) { try { driver = require('driver-weex') } catch (e) { } }
if (!driver) { try { driver = require('driver-webgl') } catch (e) { } }

if (lib) {
  let
  h = lib.h
  render = (what, where) => lib.render(what, where, { driver })
  hooks = lib
}

export { h, render, hooks }
