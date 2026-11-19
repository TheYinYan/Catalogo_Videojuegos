[Enlace en Vercel](https://catalogo-videojuegos-xi.vercel.app/)

1. **¿Dónde se encuentra ahora la fuente de verdad de los valores del formulario?**

    Está en la clase del componente (TypeScript) dentro de los objetos FormControl o FormGroup, no en la plantilla HTML.
    
2. **¿Por qué formControlName no necesita [(ngModel)]?**

    Porque formControlName ya sincroniza el valor en ambas direcciones conectando el input directamente con el FormControl de TypeScript.

3. **¿Qué diferencia hay entre invalid, touched y dirty?**

  - invalid: El valor no cumple las reglas de validación.
  - touched: El usuario entró al campo y salió de él (perdió el foco).
  - dirty: El usuario modificó el valor original del campo

4. **¿Qué aportan Git, la Pull Request y el despliegue Preview antes de fusionar main?**

    Git aísla tus cambios en ramas seguras; la Pull Request permite revisar el código en equipo y pasar tests; y el Preview despliega una web temporal para probar los cambios visualmente antes de pasarlos a producción.

