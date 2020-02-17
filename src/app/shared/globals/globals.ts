// declare here your globals variables.

// API ENDPOINTS
export const CLASES = 'api/clases/';
export const TIPO_EMPAQUES = 'api/tipo_empaques/';
export const ESTADO_EMPAQUES = 'api/estado_empaques/';
export const MARCAS = 'api/marcas/';
export const MODELOS = 'api/modelos/';
export const UBICACIONES = 'api/ubicaciones/';
export const EMPRESAS = 'api/empresas/';
export const REPRESENTANTES = 'api/representantes/';
export const VENDEDOR = 'api/vendedores/';
export const CUSTODIOS = 'api/custodios/';
export const CREAR_CUSTODIOS = 'api/custodios/crear/';
export const EMPAQUES = 'api/empaques/';
export const EMPAQUES_DISPONIBLES = 'api/empaques/disponibles/';
export const EMPAQUES_VACIOS = 'api/empaques/?estado_disp=2';
export const LLENAR_EMPAQUE = 'api/empaques/llenar/';
export const CREAR_EMPAQUES = 'api/empaques/crear/';
export const CREAR_EMPAQUES_MULTIPLES = 'api/empaques/crear/upload/';
export const LISTAR_TRANSACCIONES_NO_DESPACHADAS = 'api/ordenes/?tipo=1&despachado=False';
export const LISTAR_TRANSACCIONES_TODAS = 'api/ordenes/?tipo=1';
export const LISTAR_TRANSACCIONES_POR_VENCER = 'api/ordenes/por_vencer';
export const LISTAR_TRANSACCIONES_DESPACHADAS = 'api/ordenes/?tipo=1&despachado=True';
export const CREAR_TRANSACCION = 'api/ordenes/crear/';
export const LISTAR_ORDENESEMPAQUES = 'api/ordenes/empaques/';
export const CREAR_ORDENEMPAQUES = 'api/ordenes/empaques/enlace/';
export const ENTREGAR_ORDENESEMPAQUES = 'api/ordenes/empaques/por_entregar/';
export const CORREOS = 'api/correos/';
export const DESPACHAR_ORDENES = 'api/ordenes/despachar/';
export const LOGIN = 'api/login/';
export const ORDENES_FILTRADO = 'api/ordenesFiltrado/';

export const sep = '/';
export const apiURL = 'http://localhost:8000/';
// export const apiURL = 'http://172.19.50.81:8002/';

