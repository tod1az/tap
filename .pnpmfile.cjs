module.exports = {
  hooks: {
    readPackage(pkg) {
      const allowedScripts = [
        '@prisma/client',
        '@prisma/engines',
        '@tailwindcss/oxide',
        'esbuild',
        'prisma',
        'sharp',
        'unrs-resolver',
        'tailwindcss',
        '@tailwindcss/postcss'
      ];

      if (allowedScripts.includes(pkg.name)) {
        return pkg;
      }

      return pkg;
    }
  }
};
