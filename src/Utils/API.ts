interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}

export async function getAll(pageNumber: number) {
  const response = await fetch(`http://localhost:3000/users?limit=10&page=${pageNumber}`);
  if (!response.ok) {
    throw new Error('Sem resposta');
  }
  try {
    const data = await response.json();
    return {
      data: Array.isArray(data.data) ? data.data : [],
      totalPages: data.totalPages,
      currentPage: data.page,
      totalItems: data.totalItems,
    };
  } catch (error) {
    throw new Error('Erro ao buscar usuários');
  }
}

export const fetchById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/users/${id}`);
  if (!response.ok) {
    throw new Error('Sem resposta');
  }
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (user: User) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
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
  return id;
};

export const signIn = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    throw new Error('Erro ao logar');
  }
  return response.json();
};

export async function searchUsers(searchTerm: string, pageNumber: number) {
  const response = await fetch(`http://localhost:3000/users/filter?searchTerm=${searchTerm}&pageIndex=${pageNumber}&pageSize=10`);
  if (!response.ok) {
    throw new Error('Sem resposta');
  }
  try {
    const data = await response.json();
    return {
      data: Array.isArray(data.data) ? data.data : [],
      totalPages: Math.ceil(data.total/ data.limit),
      currentPage: data.page, // Certifique-se de que currentPage está correto
      totalItems: data.total,
    };
  } catch (error) {
    throw new Error('Erro ao buscar usuários');
  }
}
export async function sendSMS(phoneNumber: string, message: string) {
  const response = await fetch('http://localhost:3000/sms/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phoneNumber, message }),
  });

  if(!response.ok){
    throw new Error('Erro ao enviar SMS');
  }

  const data = await response.json();
  return data;

}