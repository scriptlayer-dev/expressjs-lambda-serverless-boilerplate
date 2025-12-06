/**
 * An async function that serves as a simple handler, returning a 200 OK response with a JSON body containing a message of "OK".
 * @function handler
 * @param {any} _event - The event object (unused in this function).
 * @param {any} _context - The context object (unused in this function).
 * @returns {Promise<{ statusCode: number; body: string }>} A Promise that resolves to an object containing a statusCode of 200 and a JSON stringified body with a message of "OK".
 */
export const handler = async (_event: any, _context: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'OK',
    }),
  };
};
