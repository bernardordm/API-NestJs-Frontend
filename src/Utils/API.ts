interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}


export async function getAll() {
  const response = await fetch('http://localhost:3000/users');
  if(!response.ok) {
    throw new Error('Sem resposta');
  }
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return(error);
  }
};

export const fetchByName = async (name: string) => {
  const response = await fetch(`http://localhost:3000/users/${name}`);
  if(!response.ok) {
    throw new Error('Sem resposta');
  }
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return(error);
  }
};

export const fetchById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  if(!response.ok) {
    throw new Error('Sem resposta');
  }
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return(error);
  }
};

export const createUser = async (user:User) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if(!response.ok) {
    throw new Error('Sem resposta');
  }
  return response.json();
};

export const updateUser = async (user: User) => {
  const response = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error('não foi possível atualizar');
  }
  return response.json();
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar usuário');
  }
  return response.json();
};
