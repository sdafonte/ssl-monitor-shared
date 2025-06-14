import { z } from 'zod';

// ================================================================= //
//                      SCHEMA: RESPONSIBLE                          //
// ================================================================= //
export const ResponsibleSchema = z.object({
  name: z.string().min(1, { message: "O nome do responsável é obrigatório." }),
  email: z.string().email({ message: "O e-mail do responsável é inválido." }),
  phone: z.string().optional(),
});

// ================================================================= //
//                      SCHEMA: APPLICATION                          //
// ================================================================= //
export const ApplicationSchema = z.object({
  name: z.string().min(3, { message: "O nome da aplicação deve ter no mínimo 3 caracteres." }),
  description: z.string().optional(),
  url: z.string().url({ message: "A URL fornecida é inválida." }),
  responsible: ResponsibleSchema,
  environment: z.enum(['production', 'staging', 'development']),
  priority: z.enum(['high', 'medium', 'low']),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  // Campos que serão preenchidos pelo frontend ao atualizar
  notificationConnectors: z.array(z.string()).optional(),
  showOnStatusPage: z.boolean().optional(),
});

// ================================================================= //
//                      SCHEMA: CERTIFICATE                          //
// ================================================================= //
export const CertificateHistorySchema = z.object({
  checkedAt: z.date(),
  status: z.string(),
  daysUntilExpiry: z.number(),
  errorMessage: z.string().optional(),
});

// Este schema não é usado diretamente para validação de API,
// mas é útil para tipagem forte.
export const CertificateSchema = z.object({
  applicationId: z.string(),
  domain: z.string(),
  serialNumber: z.string(),
  sans: z.array(z.string()),
  issuer: z.string(),
  validFrom: z.date(),
  validTo: z.date(),
  daysUntilExpiry: z.number(),
  status: z.enum(['valid', 'expiring', 'expired', 'invalid', 'unknown', 'insecure']),
  lastChecked: z.date(),
  tlsVersion: z.string(),
  cipherName: z.string(),
  errorMessage: z.string().optional(),
  history: z.array(CertificateHistorySchema).optional(),
});

// ================================================================= //
//               TIPOS DERIVADOS DOS SCHEMAS (Z.INFER)               //
// ================================================================= //
export type Responsible = z.infer<typeof ResponsibleSchema>;
export type Application = z.infer<typeof ApplicationSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
export type CertificateHistory = z.infer<typeof CertificateHistorySchema>;