/* eslint-disable no-undef */
import { CONSTANTS } from '../constants/constants';

let token = null;

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

export async function getFeaturedPlaylist() {
  const result = await fetch(
    `${CONSTANTS.BASE_URL}/browse/featured-playlists?country=US&limit=40`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  if (!result.ok) {
    throw new Error('Failed to fetch featured playlist!!');
  }

  const data = await result.json();
  return data;
}

export async function checkingToken() {
  if (!token) {
    await getToken(
      process.env.SPOTIFY_CLIENT_ID,
      process.env.SPOTIFY_CLIENT_SECRET
    );
  }
}

export async function getPlayListDetails(id) {
  const result = await fetch(`${CONSTANTS.BASE_URL}/playlists/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!result.ok) {
    throw new Error('Failed to fetch playlist details!!');
  }

  const data = await result.json();
  return data;
}

export async function getPlayListTrack(id) {
  const result = await fetch(`${CONSTANTS.BASE_URL}/playlists/${id}/tracks`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!result.ok) {
    throw new Error('Failed to fetch playlist track details!!');
  }

  const data = await result.json();
  return data;
}

export async function getSearchForItem(search) {
  const result = await fetch(
    `${CONSTANTS.BASE_URL}/search?type=album,playlist&q=${search}&market=US`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  if (!result.ok) {
    throw new Error('Failed to search album and playlist details!!');
  }

  const data = await result.json();
  return data;
}

export function transformAlbumFromApi(albums) {
  let temp = [];
  for (let item of albums.albums.items) {
    temp.push({
      id: item.id,
      album_type: item.album_type,
      artists: item.artists,
      url: item.external_urls.spotify,
      image: item.images[0].url,
      name: item.name,
      release_date: item.release_date,
      total_tracks: item.total_tracks,
    });
  }
  return temp;
}

export function transformFeaturedPlaylistFromApi(playlists) {
  let temp = [];
  for (let playlist of playlists.playlists.items) {
    temp.push({
      id: playlist.id,
      description: playlist.description,
      url: playlist.external_urls.spotify,
      image: playlist.images[0].url,
      name: playlist.name,
    });
  }
  return temp;
}
