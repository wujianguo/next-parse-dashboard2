import React from "react";
import { createContext, useContext, useReducer, Dispatch } from "react";

const SchemaContext = createContext<Parse.RestSchema[][]>([[], []]);
const SchemaDispatchContext = createContext<Dispatch<SchemasAction>>(() => {});

export enum SchemasActionType {
  Init = 'init',
  Add = 'add',
}

interface SchemasAction {
  type: SchemasActionType;
  schema?: Parse.RestSchema | undefined;
  schemas?: Parse.RestSchema[] | undefined;
}

export function SchemaProvider({ children }: { children: React.ReactNode }) {
  const [schemas, dispatch] = useReducer(schemasReducer, [[], []]);

  return (
    <SchemaContext.Provider value={schemas}>
      <SchemaDispatchContext.Provider value={dispatch}>
        {children}
      </SchemaDispatchContext.Provider>
    </SchemaContext.Provider>
  );
}

export function useSchemas() {
  return useContext(SchemaContext);
}

export function useSchemaDispatch() {
  return useContext(SchemaDispatchContext);
}

function schemasReducer(schemas: Parse.RestSchema[][], action: SchemasAction) {
  switch (action.type) {
    case SchemasActionType.Init: {
      if (!action.schemas) {
        return [[], []];
      }
      const internalSchemas = action.schemas.filter((schema) => schema.className.startsWith('_'));
      const customSchemas = action.schemas.filter((schema) => !schema.className.startsWith('_'));
      return [internalSchemas, customSchemas];
    }
    case SchemasActionType.Add: {
      if (!action.schema) {
        return schemas;
      }
      if (action.schema.className.startsWith('_')) {
        return [[...schemas[0], action.schema], schemas[1]];        
      } else {
        return [schemas[0], [...schemas[1], action.schema]];
      }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
