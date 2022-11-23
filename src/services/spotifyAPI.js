import { CONSTANTS } from '../constants/constants';

let token = '';

export async function getToken(clientId, clientSecret) {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + window.btoa(clientId + ':' + clientSecret),
    },
    body: 'grant_type=client_credentials',
  });

  if (!result.ok) {
    throw new Error('Failed to get accessToken!!');
  }

  const data = await result.json();
  token = data?.access_token;
  console.log(token);
}

export async function getNewRelease() {
  const result = await fetch(
    `${CONSTANTS.BASE_URL}/browse/new-releases?country=US&limit=40`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  if (!result.ok) {
    throw new Error('Failed to load new release album!!');
  }

  const data = await result.json();
  return data;
}

export async function getAlbumDetails(id) {
  const result = await fetch(`${CONSTANTS.BASE_URL}/albums/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!result.ok) {
    throw new Error('Failed to load album details!!');
  }

  const data = await result.json();
  return data;
}

export async function getArtistInfo(id) {
  const result = await fetch(`${CONSTANTS.BASE_URL}/artists/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!result.ok) {
    throw new Error('Failed to load artist information!!');
  }

  const data = await result.json();
  return data;
}

export async function getAlbumTracks(id) {
  const result = await fetch(`${CONSTANTS.BASE_URL}/albums/${id}/tracks`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!result.ok) {
    throw new Error('Failed to load album tracks!!');
  }

  const data = await result.json();
  return data;
}
