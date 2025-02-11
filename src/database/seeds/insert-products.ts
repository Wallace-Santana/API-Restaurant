import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    
    await knex("products").del();

    await knex("products").insert([
        { name:"Lasanha", price: 45 },
        { name:"Isca de frango", price: 60 },
        { name:"Moqueca de peixe", price:100 },
        { name:"Escondidinho de carne", price:75 },
        { name:"Porção de batatas fritas", price:35 },
        { name:"Executivo de frango grelhado", price:40 },
        { name:"Caldo de sururu", price:19 },
        { name:"Caldo de camarão", price:30 },
        { name:"Refrigerante 350ml", price:7.5 },
        { name:"Suco de laranja 500ml", price:10 },
    ]);
};
