const url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:8080/api/auth/' :
    'https://restserver-curso-fher.herokuapp.com/api/auth/';


let usuario = null;
let socket = null;

txtUid = document.querySelector('#txtUid');
txtMensaje = document.querySelector('#txtMensaje');
ulUsuarios = document.querySelector('#ulUsuarios');
ulMensajes = document.querySelector('#ulMensajes');
btnSalir = document.querySelector('#btnSalir');

const validarJWT = async() => {
    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(url, {
        headers: { 'x-token': token }
    });

    const { usuario: userDB, token: tokenDB } = await resp.json()
    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSoket();
};

const conectarSoket = async() => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Sockets online');
    });

    socket.on('disconnect', () => {
        console.log('Sockets offline');
    });

    socket.on('recibir-mensaje', () => {
        // TODO:
    });

    socket.on('usuarios-activos', () => {
        // TODO:
    });

    socket.on('mensaje-privado', () => {
        // TODO:
    });
};

const main = async() => {

    await validarJWT();

}

main();