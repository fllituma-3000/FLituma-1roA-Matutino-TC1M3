

interface Estudiante {
    id: number;
    nombre: string;
    edad: number;
    promedio: number;
    activo: boolean;
}

interface IResultado<T> {
    ok: boolean;
    mensaje: string;
    data?: T;
}



class SistemaEstudiantes {

    private estudiantes: Estudiante[] = [];

    
    agregar(est: Estudiante): IResultado<Estudiante> {

        
        if (this.estudiantes.some(e => e.id === est.id)) {
            return { ok: false, mensaje: "Error: el ID ya existe" };
        }

        
        if (est.edad < 15 || est.edad > 80) {
            return { ok: false, mensaje: "Edad fuera de rango permitido" };
        }

        
        if (est.promedio < 0 || est.promedio > 10) {
            return { ok: false, mensaje: "Promedio inválido (0 a 10)" };
        }

        
        this.estudiantes.push(est);

        return {
            ok: true,
            mensaje: "Estudiante agregado correctamente",
            data: est
        };
    }

    
    listar(): Estudiante[] {
        return this.estudiantes;
    }

    
    buscarPorId(id: number): IResultado<Estudiante> {
        const encontrado = this.estudiantes.find(e => e.id === id);

        if (!encontrado) {
            return { ok: false, mensaje: "No existe estudiante con ese ID" };
        }

        return {
            ok: true,
            mensaje: "Estudiante encontrado",
            data: encontrado
        };
    }

    
    actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> {

        if (nuevoPromedio < 0 || nuevoPromedio > 10) {
            return { ok: false, mensaje: "Promedio inválido" };
        }

        const estudiante = this.estudiantes.find(e => e.id === id);

        if (!estudiante) {
            return { ok: false, mensaje: "No se encontró el estudiante" };
        }

        estudiante.promedio = nuevoPromedio;

        return {
            ok: true,
            mensaje: "Promedio actualizado",
            data: estudiante
        };
    }

    
    cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {

        const estudiante = this.estudiantes.find(e => e.id === id);

        if (!estudiante) {
            return { ok: false, mensaje: "No existe estudiante con ese ID" };
        }

        estudiante.activo = activo;

        return {
            ok: true,
            mensaje: "Estado modificado",
            data: estudiante
        };
    }

    
    listarActivos(): Estudiante[] {
        return this.estudiantes.filter(e => e.activo);
    }

    
    promedioGeneral(): number {
        if (this.estudiantes.length === 0) return 0;

        const suma = this.estudiantes.reduce((acum, est) => acum + est.promedio, 0);

        return suma / this.estudiantes.length;
    }
}




function mostrarMenu(): void {
    console.log("-------- MENU DEL SISTEMA --------");
    console.log("1. Agregar estudiante");
    console.log("2. Listar estudiantes");
    console.log("3. Buscar por ID");
    console.log("4. Actualizar promedio");
    console.log("5. Cambiar estado");
    console.log("6. Listar activos");
    console.log("7. Promedio general");
    console.log("----------------------------------");
}




function ejecutarDemo(sistema: SistemaEstudiantes): void {

    console.log("=== DEMO AUTOMÁTICA DEL SISTEMA ===");

    
    sistema.agregar({
        id: 1,
        nombre: "Luis",
        edad: 20,
        activo: true,
        promedio: 8.5
    });

    sistema.agregar({
        id: 2,
        nombre: "Ana",
        edad: 22,
        activo: true,
        promedio: 9.2
    });

    sistema.agregar({
        id: 3,
        nombre: "Carlos",
        edad: 19,
        activo: true,
        promedio: 7.8
    });

    console.log("\nLista completa:");
    console.log(sistema.listar());

    console.log("\nBuscar ID=2:");
    console.log(sistema.buscarPorId(2));

    console.log("\nActualizar promedio ID=1:");
    console.log(sistema.actualizarPromedio(1, 9.0));

    console.log("\nCambiar estado ID=3 (inactivo):");
    console.log(sistema.cambiarEstado(3, false));

    console.log("\nListar solo activos:");
    console.log(sistema.listarActivos());

    console.log("\nPromedio general del curso:");
    console.log(sistema.promedioGeneral());

    console.log("\n=== FIN DE LA DEMO ===");
}




const sistema = new SistemaEstudiantes();
ejecutarDemo(sistema);
