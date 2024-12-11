"use client";
import { JSONSchema } from "@effect/schema";
import * as S from "@effect/schema/Schema";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import {} from "effect";
import { useState } from "react";
import { useBoolean } from "src/hooks/use-boolean";
import { RouterLink } from "src/routes/components";
import { paths } from "src/routes/paths";

import { FormHead } from "../components/form-head";

const schema: RJSFSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      title: "Email",
    },
    password: {
      type: "string",
      title: "Password",
    },
  },
  required: ["email", "password"],
};

const SignInSchema = JSONSchema.make(
  S.Struct({
    email: S.String,
    password: S.String,
  }).annotations({
    default: {
      email: "demo@minimals.cc",
      password: "@demo1",
    },
  }),
);
// ----------------------------------------------------------------------

export function SignInView() {
  const defaultValues = {
    email: "demo@minimals.cc",
    password: "@demo1",
  };

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link
              component={RouterLink}
              href={paths.auth.jwt.signUp}
              variant="subtitle2"
            >
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: "center", md: "left" } }}
      />

      <Alert severity="info" sx={{ mb: 3 }}>
        Use <strong>{defaultValues.email}</strong>
        {" with password "}
        <strong>{defaultValues.password}</strong>
      </Alert>

      {/*{!!errorMsg && (*/}
      {/*  <Alert severity="error" sx={{ mb: 3 }}>*/}
      {/*    {errorMsg}*/}
      {/*  </Alert>*/}
      {/*)}*/}

      <Form schema={SignInSchema as RJSFSchema} validator={validator} />
    </>
  );
}
