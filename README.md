# Notes.API
This note manager allows you to add, edit, delete, share your notes, and open other people's notes via links. You can only read notes that you have not created.
Server-side of the full-stack application, client-side [here](https://github.com/Egxr41k/Notes.UI/)

used C#, ASP.NET, Entity Framework

![Preview](https://github.com/Egxr41k/Notes.UI/blob/master/FirstImg.jpg?raw=true)

##Todo
1. ~~Base CRUD-methods~~
2. ~~Publish to Azure~~
3. Add regestration/autorzation.
4. Add a "share note" method, that will generate a unique link for each note

### CRUD operation realization

Create:

```csharp
[HttpPost]
public async Task<IActionResult> AddNote(Note note)
{
	note.Id = Guid.NewGuid();
	await notesDbContext.Notes.AddAsync(note);
	await notesDbContext.SaveChangesAsync();

	return CreatedAtAction(
		nameof(GetNoteById),
		new { id = note.Id },
		note
	);
}
```
Read:

```csharp
[HttpGet]
[Route("{id:Guid}")]
public async Task<IActionResult> GetNoteById([FromRoute] Guid id)
{
	var note = await notesDbContext.Notes.FindAsync(id);
	if (note == null) return NotFound();
	return Ok(note)
}
```
Update:

```csharp
[HttpPut]
[Route("{id:Guid}")]
public async Task<IActionResult> UpdateNote([FromRoute] Guid id, [FromBody] Note updatedNote)
{
	var existingNote = await notesDbContext.Notes.FindAsync(id);
	if (existingNote == null) return NotFound();

	existingNote.Title = updatedNote.Title;
	existingNote.Description = updatedNote.Description;
	existingNote.IsVisible = updatedNote.IsVisible;
            
	await notesDbContext.SaveChangesAsync();

	return Ok(existingNote);
}
```
Delete:

```csharp
[HttpDelete]
[Route("{id:Guid}")]
public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
{
	var existingNote = await notesDbContext.Notes.FindAsync(id);
	if (existingNote == null) return NotFound();
	notesDbContext.Notes.Remove(existingNote);
	await notesDbContext.SaveChangesAsync();
	return Ok();
}
```

## Installation and Running 
```
git clone https://github.com/Egxr41k/Notes.API.git 
cd Notes.API
dotnet run ---launch-profile https
```

###@Egxr41k 2023
