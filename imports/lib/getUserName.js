const getUserName = name => ({
  string: name,
  object: `${name.givenName} ${name.familyName}`,
}[typeof name]);

export default getUserName;
