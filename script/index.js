const WRAPPER = document.querySelector('.wrapper');
const divMateria = document.getElementsByClassName('materia');
const contador = document.querySelector('.contador');

class Materia{
  habilitada;
  nombre;
  año;
  correlativas;

  constructor(nombre,año){
    this.nombre = nombre;
    this.año = año;
  }
  habilitar(){
    this.habilitada = true;
  }

  get aprobada() {
    return this.correlativas[1].every(mat => mat.aprobada);
  }

  
  set añadir(pCorrelativas){
    this.correlativas = pCorrelativas;
  }
}

const Alumno = {
  materiasAprobadas:[],
  materiasCursadas:[],
  set aproboMateria(pMateria){
    if (!this.materiasAprobadas.includes(pMateria)) {
      this.materiasAprobadas.push(pMateria);
    }
    this.materiasPosibles;
  },
  set aproboCursada(pMateria){
    if (!this.materiasCursadas.includes(pMateria)) {
      this.materiasCursadas.push(pMateria);
    }
    this.materiasPosibles;
  },
  get materiasPosibles() {
    let posibles = [];
    for (const materia of materiasObjetos) {
      if (
        //El alumno no la tiene aprobada o cursada
        (!this.materiasAprobadas.includes(materia) && (!this.materiasCursadas.includes(materia))) 
        && 
        //No tiene correlativas o cumple con los requisitos
        ((materia.correlativas.every((correl) => correl.length === 0) || (materia.correlativas[0].every(correl => this.materiasCursadas.includes(correl)) && materia.correlativas[1].every(correl => this.materiasAprobadas.includes(correl))))))
        {
          posibles.push(materia)
          
        } 
    }
    
    return posibles;
  }
  ,
  eliminarMateriaCursada(pMateria){
    this.materiasCursadas = this.materiasCursadas.filter(materia => materia !== pMateria)
  }
  ,
  eliminarMateriaAprobada(pMateria){
    this.eliminarMateriaCursada(pMateria);
    this.materiasAprobadas = this.materiasAprobadas.filter(materia => materia !== pMateria);
  }
  }
const materias = {
1:['Análisis Matemático 1','Álgebra y Geometría Analítica','Física 1','Inglés 1','Lógica y Estructuras Discretas','Algoritmos y Estructuras de Datos','Arquitectura de Computadoras','Sistemas y Procesos de Negocio'],
2:['Análisis Matemático 2','Física 2','Ingeniería y Sociedad','Inglés 2','Sintaxis y Semántica de los Lenguajes','Paradigmas de Programación','Sistemas Operativos','Análisis de Sistemas de Información [integradora]'],
3:['Probabilidades y Estadísticas','Economía','Bases de Datos','Desarrollo de Software','Comunicación de Datos','Análisis Numérico','Diseño de Sistemas de Información [integradora]','Seguridad Informatica (E)','Sistemas de Gestion Integral (E)'],
4:['Legislación','Ingeniería y Calidad de Software','Redes de Datos','Investigación Operativa','Simulación','Tecnologías para la Automatización','Administración de Sistemas de Información [integradora]','Pensamiento Computacional y Programacion (E)','Administracion de Bases de Datos (E)','Acustica Fisica (E)','Lenguajes, Computabilidad y Aplicaciones (E)'],
5:['Inteligencia Artificial','Ciencia de Datos','Sistemas de Gestión','Gestión Gerencial','Seguridad en los Sistemas de Información','Proyecto Final [integradora]',]
};
const correlativas = {
  'Análisis Matemático 1': [[],[]],
  'Álgebra y Geometría Analítica': [[],[]],
  'Física 1': [[],[]],
  'Inglés 1': [[],[]],
  'Lógica y Estructuras Discretas': [[],[]],
  'Algoritmos y Estructuras de Datos': [[],[]],
  'Arquitectura de Computadoras': [[],[]],
  'Sistemas y Procesos de Negocio': [[],[]],

  'Análisis Matemático 2': [['Análisis Matemático 1', 'Álgebra y Geometría Analítica'],[]],
  'Física 2': [['Análisis Matemático 1', 'Física 1'],[]],
  'Ingeniería y Sociedad': [[],[]],
  'Inglés 2': [['Inglés 1'],[]],
  'Sintaxis y Semántica de los Lenguajes': [['Lógica y Estructuras Discretas', 'Algoritmos y Estructuras de Datos'],[]],
  'Paradigmas de Programación': [['Lógica y Estructuras Discretas', 'Algoritmos y Estructuras de Datos'],[]],
  'Sistemas Operativos': [['Arquitectura de Computadoras'],[]],
  'Análisis de Sistemas de Información [integradora]': [['Algoritmos y Estructuras de Datos', 'Sistemas y Procesos de Negocio'],[]],

  'Probabilidades y Estadísticas': [['Análisis Matemático 1', 'Álgebra y Geometría Analítica'],[]],
  'Economía': [[],['Análisis Matemático 1', 'Álgebra y Geometría Analítica']],
  'Bases de Datos': [['Sintaxis y Semántica de los Lenguajes', 'Análisis de Sistemas de Información [integradora]'],['Lógica y Estructuras Discretas', 'Algoritmos y Estructuras de Datos']],
  'Desarrollo de Software': [['Paradigmas de Programación', 'Análisis de Sistemas de Información [integradora]'],['Lógica y Estructuras Discretas', 'Algoritmos y Estructuras de Datos']],
  'Comunicación de Datos': [[],['Física 1', 'Arquitectura de Computadoras']],
  'Análisis Numérico': [['Análisis Matemático 2'],['Análisis Matemático 1', 'Álgebra y Geometría Analítica']],
  'Diseño de Sistemas de Información [integradora]': [['Paradigmas de Programación', 'Análisis de Sistemas de Información [integradora]'],['Inglés 1', 'Algoritmos y Estructuras de Datos', 'Sistemas y Procesos de Negocio']],

  //ELECTIVAS
  'Seguridad Informatica (E)':[[],[]],
  'Sistemas de Gestion Integral (E)':[[],[]],
  'Pensamiento Computacional y Programacion (E)':[['Diseño de Sistemas de Información [integradora]'],[]],
  'Administracion de Bases de Datos (E)':[[],[]],
  'Acustica Fisica (E)':[[],['Física 1','Análisis Numérico']],
  'Lenguajes, Computabilidad y Aplicaciones (E)':[[],[]],

  'Legislación': [['Ingeniería y Sociedad'],[]],
  'Ingeniería y Calidad de Software': [['Bases de Datos', 'Desarrollo de Software', 'Diseño de Sistemas de Información [integradora]'],['Sintaxis y Semántica de los Lenguajes', 'Paradigmas de Programación']],
  'Redes de Datos': [['Sistemas Operativos', 'Comunicación de Datos'],[]],
  'Investigación Operativa': [['Probabilidades y Estadísticas', 'Análisis Numérico'],[]],
  'Simulación': [['Probabilidades y Estadísticas'], ['Análisis Matemático 2']],
  'Tecnologías para la Automatización': [['Física 2', 'Análisis Numérico'], ['Análisis Matemático 2']],
  'Administración de Sistemas de Información [integradora]': [['Economía', 'Diseño de Sistemas de Información [integradora]'], ['Análisis de Sistemas de Información [integradora]']],

  'Inteligencia Artificial': [['Simulación'], ['Probabilidades y Estadísticas', 'Análisis Numérico']],
  'Ciencia de Datos': [['Simulación'], ['Probabilidades y Estadísticas', 'Bases de Datos']],
  'Sistemas de Gestión': [['Economía', 'Investigación Operativa'], ['Diseño de Sistemas de Información [integradora]']],
  'Gestión Gerencial': [['Legislación', 'Administración de Sistemas de Información [integradora]'], ['Economía']],
  'Seguridad en los Sistemas de Información': [['Redes de Datos', 'Administración de Sistemas de Información [integradora]'], ['Desarrollo de Software', 'Comunicación de Datos']],

  'Proyecto Final [integradora]': [[
    'Legislación', 'Ingeniería y Calidad de Software', 'Redes de Datos', 'Investigación Operativa', 'Simulación',
    'Tecnologías para la Automatización', 'Administración de Sistemas de Información [integradora]',
    'Diseño de Sistemas de Información [integradora]', 'Inteligencia Artificial', 'Ciencia de Datos',
    'Sistemas de Gestión', 'Gestión Gerencial', 'Seguridad en los Sistemas de Información'],[]
  ]
};
var materiasObjetos = [];


function construirCorrelativas(pMateriasOBJETOS, pCorrelativas) {
  for (const nombreMateria in pCorrelativas) {
    const materiaOBJ = pMateriasOBJETOS.find(mat => mat.nombre === nombreMateria);
    const correlativasArray = pCorrelativas[nombreMateria];
    if (correlativasArray.every(array => {
        array.every(arr => arr.length === 0);
      })){
        materiaOBJ.añadir = [[],[]];
    }else{
      let correlativasCursadas = materiasObjetos.filter((objeto) => correlativasArray[0].includes(objeto.nombre));
      let correlativasAprobadas = materiasObjetos.filter((objeto) => correlativasArray[1].includes(objeto.nombre));
      materiaOBJ.añadir = [correlativasCursadas,correlativasAprobadas];
    }
    
  }
}
function construirMaterias(pMaterias){
  for (let año = 1; año < Object.keys(pMaterias).length + 1; año++) {
    pMaterias[año].forEach(materia => {
      var vMateria = new Materia(materia,año);
      materiasObjetos.push(vMateria);
    });
  }
};
function dibujarMaterias(pContenedor,pArrayMaterias){
  for (let año = 1; año < Object.keys(pArrayMaterias).length + 1; año++) {
    let arrayAño = pArrayMaterias[año];
    let divAño = document.createElement('div');

    divAño.classList.add('anio');
    pContenedor.appendChild(divAño);

    arrayAño.forEach(materia => {
      let divMateria = document.createElement('div');
      let objetoMateria = materiasObjetos.find((mat) => mat.nombre === materia);
      divMateria.innerHTML = materia;
      divMateria.classList.add('materia');
      
      if (objetoMateria.correlativas.every(correl => correl.length === 0)){
        divMateria.classList.add('habilitada');
        objetoMateria.habilitar
      }else{
        divMateria.classList.add('bloqueada');
      }
      divAño.appendChild(divMateria);
    })
  }
}
function obtenerValorObjeto(pElemento){
  let nombreDeLaMateria = pElemento.innerHTML;
  for (let i = 0; i < materiasObjetos.length; i++) {
    var materiaObjeto = materiasObjetos[i];
    if (materiaObjeto.nombre == nombreDeLaMateria){
      return materiaObjeto
    }
  }
}

function reseteoVisual(){
  const divs = document.querySelectorAll('.materia');
  divs.forEach(div => {
    const mat = obtenerValorObjeto(div);
    div.className = '';

    if (Alumno.materiasAprobadas.includes(mat)) {
      div.className = 'materia aprobada';
    } else if (Alumno.materiasPosibles.includes(mat)) {
      div.className = 'materia habilitada';
    } else if (Alumno.materiasCursadas.includes(mat)) {
      div.className = 'materia cursada'
    }else {
      div.className = 'materia bloqueada';
    }
  })
}
function contar(){
  contador.innerHTML = `${Alumno.materiasAprobadas.length} / ${cantidadDeMaterias}`
  if (Alumno.materiasAprobadas.length === cantidadDeMaterias){
    alert('Bien ahi wachin, te recibiste!')
  }
}

function eliminarMateriaYDependientes(materia) {
  // Quitar la materia actual
  Alumno.materiasAprobadas = Alumno.materiasAprobadas.filter(m => m !== materia);
  Alumno.materiasCursadas = Alumno.materiasCursadas.filter(m => m !== materia);

  // Buscar materias que dependan de esta 
  for (const posible of materiasObjetos) {
    if (
      posible.correlativas[0].includes(materia) ||
      posible.correlativas[1].includes(materia)
    ) {
      // Si ya estaba aprobada o cursada, quitarla también
      if (
        Alumno.materiasAprobadas.includes(posible) ||
        Alumno.materiasCursadas.includes(posible)
      ) {
        eliminarMateriaYDependientes(posible); // recursivo
      }
    }
  }
}

construirMaterias(materias);
construirCorrelativas(materiasObjetos,correlativas);
Alumno.materiasPosibles; //Añade las materias posibles ni bien carga la pagina
dibujarMaterias(WRAPPER,materias);


const cantidadDeMaterias = materiasObjetos.length;
contar();


WRAPPER.addEventListener("click", (e) => {
  const materiaDIV = e.target;
  if (!materiaDIV.classList.contains("materia")) return;

  const materiaObjeto = obtenerValorObjeto(materiaDIV);

  // Si esta aprobada, la desmarca
  if (Alumno.materiasAprobadas.includes(materiaObjeto)) {
    eliminarMateriaYDependientes(materiaObjeto);
    Alumno.materiasPosibles;
    reseteoVisual();
    contar();
  } else if (materiaDIV.classList.contains("habilitada")) {
    // Si esta habilitada, aprueba la cursada
    Alumno.aproboCursada = materiaObjeto;
  } else if (Alumno.materiasCursadas.includes(materiaObjeto)){
    //Si el alumno aprobo la materia, la marca como aprobada
    Alumno.aproboMateria = materiaObjeto;
    contar();
  }else{
    // Si esta bloqueada no hace nada
    return;
    
  }

  // Resetea visualmente todos los divs
  reseteoVisual();
});
Array.from(divMateria).forEach((div => {
  div.addEventListener('mouseover', () => {
    if (!div.classList.contains('materia')) return;
    if (div.classList.contains('aprobada')) return;
    if (div.classList.contains('bloqueada')) return;

    const materiaActual = obtenerValorObjeto(div);
    const arrayPodriaCursar = [];

    for (const materia of materiasObjetos) {
      const esCorrelativa = materia.correlativas.some(array => array.includes(materiaActual));
      if (!esCorrelativa) continue;
      arrayPodriaCursar.push(materia);
    }

    for (const podriaCursar of arrayPodriaCursar) {
      //Simula que pasaría si el alumno aprueba la materia o la cursada
      const aprobadasSimuladas = [...Alumno.materiasAprobadas, materiaActual];
      const cursadasSimuladas = [...Alumno.materiasCursadas, materiaActual];

      //Chequea que si la aprueba, entonces todas las condiciones se cumplen
      const todasAprobadas = podriaCursar.correlativas[1]
        .every(mat => aprobadasSimuladas.includes(mat));
      const todasCursadas = podriaCursar.correlativas[0]
        .every(mat => cursadasSimuladas.includes(mat));

      if (todasAprobadas && todasCursadas) {
        Array.from(divMateria).forEach(divMat => {
          if (
            divMat.innerHTML === podriaCursar.nombre &&
            !divMat.classList.contains('cursada') &&
            !divMat.classList.contains('aprobada') &&
            !divMat.classList.contains('habilitada')
          ) {
            divMat.classList.add('podriaCursar');
          }
        });
      }
    }
  });

  // Limpiar clases al salir
  div.addEventListener('mouseout', () => {
    Array.from(divMateria).forEach(divMat => {
      divMat.classList.remove('podriaCursar');
    });
  });
}));
