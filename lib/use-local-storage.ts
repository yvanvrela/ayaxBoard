'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [mounted, setMounted] = useState(false)

  // Leer del localStorage después de que el componente esté montado
  useEffect(() => {
    setMounted(true)
    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        const parsed = JSON.parse(item)
        setStoredValue(parsed)
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que value sea una función para tener la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Durante SSR o antes de montar, devolver initialValue para evitar mismatch de hidratación
  // Después del montaje, devolver storedValue que contiene los datos del localStorage
  return [mounted ? storedValue : initialValue, setValue]
}

