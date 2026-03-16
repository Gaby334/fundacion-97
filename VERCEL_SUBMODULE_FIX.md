# 🔧 Solucionar Warning de Vercel con Submodules

## 🚨 Error en Vercel

```
Warning: Failed to fetch one or more git submodules
```

## ✅ Lo que hice

1. **Crear `.gitmodules`** con la configuración correcta del submodule `fundacion-97`
2. **Hacer push** del archivo `.gitmodules` a GitHub
3. **Configurar Vercel** para acceder a submodules

---

## 🔑 Próximos Pasos en Vercel

### Opción 1: Usar Deploy Token (Recomendado)

1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Crea un nuevo token con permisos `repo` (acceso a repositorios)
3. En Vercel Dashboard:
   - Project settings
   - Environment Variables
   - Agregar variable: `GIT_CREDENTIALS`
   - Valor: `https://oauth2:[TU_PERSONAL_TOKEN]@github.com`

### Opción 2: Configurar en Vercel CLI

```bash
# Si tienes Vercel CLI instalado
vercel env add GIT_CREDENTIALS
# Ingresar: https://oauth2:[TU_TOKEN]@github.com
```

### Opción 3: Usar Deploy Key en GitHub

1. En GitHub → fundacion-97 settings
2. Deploy keys
3. Agregar deploy key pública de Vercel
4. Dar permisos de lectura

---

## 📋 Cambios Realizados

| Archivo | Acción | Detalles |
|---------|--------|----------|
| `.gitmodules` | CREADO | Configuración del submodule fundacion-97 |
| `PUSH_INSTRUCTIONS.md` | AGREGADO | Instrucciones anteriores |
| Commit | NUEVO | `a0c81ec` |

---

## 🔍 Verificar en Vercel

1. Ve a tu proyecto en Vercel
2. Fuerza un redeployment (Redeploy)
3. Monitorea los logs
4. Debería ver:
   ```
   ✓ Initialized git repository
   ✓ Cloned repository
   ✓ Initialized submodules
   ```

---

## 🎯 Si sigue sin funcionar

Necesitas configurar en Vercel:

1. **Project Settings**
2. **Git**
3. **Deploy on Git Push** → Disable temporarily
4. En **Environment Variables** agregar:
   ```
   GIT_TERMINAL_PROMPT=0
   GIT_CREDENTIALS=https://[USERNAME]:[PERSONAL_TOKEN]@github.com
   ```

---

**Estado**: ✅ `.gitmodules` configurado y pushado a GitHub

**Próximo**: Configura credenciales en Vercel dashboard
