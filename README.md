# Simple Worship

Simple Worship is a _very simple_ blog-like site that makes it easy for folks
who are attending small, "backyard" worship sessions to find lyrics for the
songs that will be sung. This is useful for times when someone is hosting a
worship session, and there are no screens or projectors to show lyrics with.

# Adding Content

## Adding a Setlist

A setlist is a list of songs - they function as "orders of worship" in this
context. To add a setlist, clone an existing setlist file in the
`/src/content/setlists/` directtory. Rename it so that the first 8 characters
are the date in `YYYYMMDD` format, then give the remainder of the filename a
slug that describes the event that the setlist is for. Setlist file names need
to be unique.

Finally, fill out the info in each field of your new setlist. Dates should be
in UTC timezone. Songs are based on the names of files (excluding extensions)
in the `/src/content/songs/` directory. If you provide a song that doesn't have
a corresponding file in the `songs` content folder, then the site will fail to
build.

If a song doesn't exist, you'll need to add it.

## Adding Songs

To add a song (which can in turn be added to a setlist), clone an existing song
in the `/src/content/songs/` folder. Rename that file to the following format:

```
<artist-name>-<song-name>.md
```

Leading with the artist name helps sort the files visually in the directory. File names must, of course, be unique.

Next, update the front matter of the document - this is the YAML data between the `---` markers at the top of the file.

Finally, update the lyrics. Pay attention to how the markdown is laid out in existing files.

