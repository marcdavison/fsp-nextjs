export type StateType = {
    message: string;
    status?: number;
    data: any
};


export type FormAction = (
    prevState: StateType,
    formData: FormData) => Promise<StateType>;