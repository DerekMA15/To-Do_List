// definição da nossa estutura de dados que nossa API vai receber e enviar.
export interface ITask {
    id?: number; // Deixar como opcional, pois no POST o banco gera o ID
    titulo: string;
    concluida:boolean;
};