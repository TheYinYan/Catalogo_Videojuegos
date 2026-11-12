1. **¿Qué proporciona FormsModule?**

    Las directivas y herramientas (ngModel, ngForm) para crear formularios basados en plantillas.

2. **¿Qué función tiene [(ngModel)]?**

    Crea un enlace de datos bidireccional entre el campo HTML y la variable del componente.

3. **¿Por qué es necesario utilizar name?**

    Para que Angular registre e identifique de forma única cada campo dentro del formulario.

4. **¿Qué representa #gameForm="ngForm"?**

    Una referencia de plantilla al formulario completo para consultar su estado global y métodos.

5. **¿Qué representa #title="ngModel"?**

    Una referencia de plantilla a un campo específico para consultar su estado individual de validación.

6. **¿Qué diferencia existe entre valid e invalid?**

    valid indica que cumple todas las reglas de validación; invalid indica que falla al menos una.

7. **¿Qué diferencia existe entre pristine y dirty?**

    pristine significa que el valor no se ha modificado; dirty significa que el usuario ya lo cambió. 

8. **¿Qué diferencia existe entre untouched y touched?**

    untouched indica que el campo no ha perdido el foco aún; touched indica que el usuario ya entró y salió de él.

9. **¿Qué información contiene errors?**

    Un objeto con las validaciones específicas que han fallado (o null si todo es correcto).

10. **¿Por qué utilizamos normalmente invalid && (dirty || touched) para mostrar errores?**

    Para evitar mostrar errores nada más cargar la página, con esta condición, el error solo aparece si el dato es incorrecto y el usuario ya ha empezado a escribir en él (dirty) o ya ha salido del campo tras visitarlo (touched)

11. **¿Por qué los mensajes desaparecen automáticamente al corregir un dato?**

    Porque Angular reevalúa la validación en tiempo real y oculta el mensaje al pasar invalid a false.

12. **¿Por qué el botón puede habilitarse automáticamente cuando cambia el formulario?**

    Porque su propiedad [disabled] está vinculada al estado dinámico gameForm.invalid.

13. **¿Qué ventaja tiene utilizar ngSubmit frente a escuchar únicamente el click de un botón?**

    Permite enviar el formulario tanto haciendo clic en el botón como pulsando la tecla Enter en cualquier campo. 

14. **¿Qué operación HTTP se utiliza para crear un videojuego?**

    El método Post

15. **¿Qué operación se utiliza para actualizarlo?**

    El método Put

16. **¿Por qué utilizamos gameForm.resetForm() después de guardar?**

    Para vaciar los campos y reiniciar sus estados
