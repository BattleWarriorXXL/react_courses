
const signUp = async (email: string, password: string, name: string) => {
    console.log(email);
    console.log(password);
    console.log(name);
};

const signIn = async (email: string, password: string) => {
    console.log(email);
    console.log(password);
};

const UserService = {
    signUp
};

export default UserService;
