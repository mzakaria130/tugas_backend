const { nanoid } = require('nanoid');
const notes = require('./notes.js');

const addNotesHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNotes = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt
    };

    notes.push(newNotes);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        }).code(201);

        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan!',
    }).code(500);

    return response;
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes
    }
});

const getNotesByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if(note !== undefined){
        return {
            status: 'success',
            data: {
                note
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan'
    }).code(404);
    return response;
}

const editNotesByIdHandler = (request, h) => {
    const { id } = request.params;
    const { tittle, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            tittle,
            tags,
            body,
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'catatan berhasil ditambahkan'
        }).code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan gagal ditambahkan',
    }).code(404);

    return response;
}

const deleteNotesByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'pesan berhasil dihapus'
        }).code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'pesan gagal dihapus'
    }).code(404);
    return response;
}

module.exports = {
    addNotesHandler,
    getAllNotesHandler,
    getNotesByIdHandler,
    editNotesByIdHandler,
    deleteNotesByIdHandler
};