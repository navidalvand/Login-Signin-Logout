class AuthService {
  model = {
    async create(model, options) {
      return await model.create(options);
    },
  };
}
