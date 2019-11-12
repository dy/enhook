let enhook, lib, useState, useReducer, useEffect, useMemo, useCallback, useRef, useLayoutEffect

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  enhook = lib.default
  useState = lib.useState
  useReducer = lib.useReducer
  useEffect = lib.useEffect
  useMemo = lib.useMemo
  useCallback = lib.useCallback
  useRef = lib.useRef
  useLayoutEffect = lib.useLayoutEffect
}

export { enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef, useLayoutEffect }
