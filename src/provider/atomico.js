let render, h, lib, hooks, useState, useReducer, useEffect, useMemo, useCallback, useRef

try { lib = require('atomico') } catch (e) { }
if (lib) {
  h = lib.h
  render = lib.render
  useState = lib.useState
  useReducer = lib.useReducer
  useEffect = lib.useEffect
  useMemo = lib.useMemo
  useCallback = lib.useCallback
  useRef = lib.useRef
}

export { render, h, useState, useReducer, useEffect, useMemo, useCallback, useRef }
