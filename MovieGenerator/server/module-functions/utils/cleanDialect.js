const cleanDialect = async (input) => {
  const segment = input
    .split(/(?=\d+\.)/)     
    .map(s => s.trim())         
    .filter(Boolean);           

  const cleanedDialect = segment.map(segment =>
    segment.replace(/^\d+\.\s*/, "")
  );

  return cleanedDialect;
};

module.exports = { cleanDialect };
