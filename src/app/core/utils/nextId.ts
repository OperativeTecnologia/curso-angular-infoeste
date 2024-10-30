/**
 * Gera um ID único sequencial com um prefixo opcional.
 *
 * @param [prefix='id'] - O prefixo a ser usado no ID. Padrão é 'id'.
 * @returns Um ID único no formato 'prefixo_número'.
 *
 * @example
 * console.log(nextId()); // 'id_0'
 * console.log(nextId('user')); // 'user_1'
 * console.log(nextId()); // 'id_2'
 *
 * @remarks
 * Esta função utiliza um closure para manter um contador interno,
 * garantindo que cada ID gerado seja único durante a execução do programa.
 */
export const nextId = (() => {
  let i = 0;
  return (prefix = 'id') => `${prefix}_${i++}`;
})();
