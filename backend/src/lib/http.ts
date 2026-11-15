import type { Response } from "express";

/** JSON error response. */
export const fail = (res: Response, status: number, error: string) => res.status(status).json({ error });

export const isUuid = (s: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
