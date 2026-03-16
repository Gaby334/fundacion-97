# 📦 Instrucciones de Commit - Branch Prototypes

## 🔄 Cómo Hacer Commit de los Cambios

### Paso 1: Verificar que estés en el branch prototypes
```bash
git branch
# Deberías ver:
# * prototypes
#   main
```

Si no estás en prototypes:
```bash
git checkout prototypes
```

---

### Paso 2: Ver cambios realizados
```bash
git status
# Deberías ver archivos nuevos y modificados

git diff --name-only
# Lista de archivos modificados
```

---

### Paso 3: Revisar cambios específicos
```bash
# Ver cambios en un archivo
git diff js/navigation.js

# Ver cambios en HTML
git diff pages/dashboard.html
```

---

### Paso 4: Agregar cambios (Stage)
```bash
# Opción A: Agregar todo
git add .

# Opción B: Agregar archivos específicos
git add js/navigation.js
git add pages/dashboard.html
git add pages/tracker.html
git add pages/proyectos.html
git add index.html
git add NAVIGATION_IMPROVEMENTS.md
git add NAVIGATION_BEFORE_AFTER.md
git add .github/copilot-instructions.md
git add IMPLEMENTATION_SUMMARY.md
```

---

### Paso 5: Verificar que todo está staged
```bash
git status
# Debería mostrar archivos en verde (staged)
```

---

### Paso 6: Hacer commit
```bash
git commit -m "feat(navigation): centralizar navegación con NavigationManager

- Crear NavigationManager para navegación consistente
- Detectar página actual automáticamente
- Calcular rutas relativas correctas
- Mobile menu auto-cierre inteligente
- Resaltar link de página activa
- Integración con wallet status
- Actualizar HTML en todas las páginas
- Documentación completa

Resuelve:
- Links inconsistentes entre páginas
- Menú mobile que no se cerraba
- Falta de indicador de página activa
- DRY principle: antes 170 líneas duplicadas, ahora 0"
```

---

### Paso 7: Verificar commit
```bash
git log --oneline -5
# Deberías ver tu commit en la lista
```

---

### Paso 8: Empujar a GitHub
```bash
# Empujar branch prototypes
git push origin prototypes

# O si es la primera vez que empujas este branch:
git push -u origin prototypes
```

---

### Paso 9: Crear Pull Request (opcional pero recomendado)
```
1. Ir a https://github.com/Gaby334/fundacion-97
2. Click en "Pull requests"
3. Click en "New pull request"
4. Base: main
5. Compare: prototypes
6. Click en "Create pull request"
7. Agregar descripción:

---

### Descripción del PR

## Mejoras de Navegación

### Problema
- Menú desaparece al navegar entre páginas
- Links rotos dependiendo de la página
- Navegación inconsistente (diferentes diseños)
- Menú mobile no se cierra automáticamente

### Solución
Se implementó `NavigationManager` centralizado que:
- Detecta página actual automáticamente
- Genera links con rutas correctas desde cualquier página
- Mantiene navegación consistente en todas las páginas
- Auto-cierra menú mobile al navegar
- Resalta página activa

### Cambios
- ✅ Nueva: `js/navigation.js` (280 líneas)
- ✅ Modificado: `index.html`
- ✅ Modificado: `pages/dashboard.html`
- ✅ Modificado: `pages/tracker.html`
- ✅ Modificado: `pages/proyectos.html`
- ✅ Actualizado: `.github/copilot-instructions.md`
- ✅ Documentación: `NAVIGATION_IMPROVEMENTS.md`
- ✅ Documentación: `NAVIGATION_BEFORE_AFTER.md`
- ✅ Resumen: `IMPLEMENTATION_SUMMARY.md`

### Testing
- [x] Links correctos en todas las páginas
- [x] Mobile menu funciona y auto-cierra
- [x] Dark mode integrado
- [x] Wallet status se actualiza
- [x] Responsive design funciona

### Listo para Review y Merge
```

---

## 📋 Checklist Antes de Push

- [ ] Ejecutaste `git status` y no hay cambios sin guardar
- [ ] Revisaste los diffs antes de commitear
- [ ] El mensaje de commit es descriptivo
- [ ] Probaste la navegación en el navegador
- [ ] No hay errores en consola (DevTools)
- [ ] Los links funcionan en todas las páginas

---

## 🔍 Comandos Útiles

### Ver historial de commits
```bash
git log --oneline -10
```

### Ver cambios no comiteados
```bash
git status
git diff
```

### Deshacer cambios (si necesitas)
```bash
# Deshacer archivo específico
git checkout -- pages/dashboard.html

# Deshacer todos los cambios en staging
git reset HEAD

# Deshacer commit (¡cuidado!)
git revert HEAD
```

### Ver branch actual
```bash
git branch
git branch -v
```

### Cambiar de branch
```bash
git checkout main
git checkout prototypes
```

---

## 🚀 Después del Commit

### Ver en GitHub
1. Visita: https://github.com/Gaby334/fundacion-97
2. Branch dropdown → selecciona "prototypes"
3. Deberías ver los archivos nuevos/modificados

### Comparar con main
```bash
git diff main...prototypes
```

### Fusionar a main (cuando esté listo)
```bash
# Cambiar a main
git checkout main

# Traer últimos cambios
git pull origin main

# Fusionar prototypes
git merge prototypes

# Empujar cambios
git push origin main
```

---

## 💡 Tips

- 📝 Commits pequeños son mejor que commits grandes
- 📊 Escribe mensajes descriptivos
- 🔄 Revisa los cambios antes de commitear
- ✅ Prueba todo antes de push
- 📌 Usa branches para features nuevo

---

## 📞 Si Algo Sale Mal

### No puedo hacer push
```bash
# Posible causa: branch remoto no existe
# Solución:
git push -u origin prototypes
```

### Conflict con main
```bash
# Actualizar prototypes con cambios de main
git fetch origin
git merge origin/main

# Resolver conflictos en tu editor
# Luego:
git add .
git commit -m "resolve: merge conflicts"
git push origin prototypes
```

### Olvide agregar un archivo
```bash
# Agregar el archivo al último commit
git add archivo-olvidado.txt
git commit --amend --no-edit

# O hacer un nuevo commit
git add archivo-olvidado.txt
git commit -m "fix: agregar archivo faltante"
```

---

**Éxito con tu commit! 🚀**
