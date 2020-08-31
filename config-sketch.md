# Data model

# library

- id
- name
- root path
- ignore paths / globs

# media metadata

- id
- type
- libraryId
- filename
- subpath
- filesize
- created at / updated at
- photo date
- albums (AlbumIds[])

# Album

- id
- name
- color
- medias (libId / mediaId)[]
