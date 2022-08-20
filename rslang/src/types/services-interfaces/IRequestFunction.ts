interface IRequestFunctionOptions {
  method?: string,
  body?: string,
  headers?: {
    [header: string]: string,
  },
}

export default IRequestFunctionOptions;
