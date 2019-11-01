let enhook, lib, useState, useReducer, useEffect, useMemo, useCallback, useRef

try { lib = require('tng-hooks') } catch (e) { }
if (lib) {
  enhook = lib.TNG
  useState = lib.useState
  useReducer = lib.useReducer
  useEffect = lib.useEffect
  useMemo = lib.useMemo
  useCallback = lib.useCallback
  useRef = lib.useRef
}

export { enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef }
