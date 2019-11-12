let h, render, lib, driver, useState, useReducer, useEffect, useMemo, useCallback, useRef, useImperativeHandle, useLayoutEffect

try { lib = require('rax') } catch (e) { }
try { driver = require('driver-dom') } catch (e) { }
if (!driver) { try { driver = require('driver-universal') } catch (e) { } }
if (!driver) { try { driver = require('driver-worker') } catch (e) { } }
if (!driver) { try { driver = require('driver-weex') } catch (e) { } }
if (!driver) { try { driver = require('driver-webgl') } catch (e) { } }


if (lib) {
  h = lib.createElement
  render = (what, where) => lib.render(what, where, { driver })

  useState = lib.useState
  useReducer = lib.useReducer
  useEffect = lib.useEffect
  useMemo = lib.useMemo
  useCallback = lib.useCallback
  useRef = lib.useRef
  useImperativeHandle = lib.useImperativeHandle
  useLayoutEffect = lib.useLayoutEffect
}

export { h, render, useState, useReducer, useEffect, useMemo, useCallback, useRef, useImperativeHandle, useLayoutEffect }
