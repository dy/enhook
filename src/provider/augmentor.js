let enhook, lib, useState, useReducer, useEffect, useMemo, useCallback, useRef

try { lib = require('augmentor') } catch (e) { }
if (lib) {
  enhook = lib.default
  useState = lib.useState
  useReducer = lib.useReducer
  useEffect = lib.useEffect
  useMemo = lib.useMemo
  useCallback = lib.useCallback
  useRef = lib.useRef
}

export { enhook, useState, useReducer, useEffect, useMemo, useCallback, useRef }
