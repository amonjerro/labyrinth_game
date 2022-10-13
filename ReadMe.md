## Labyrinth Game

This is a simple and minimalistic game about traversing a labyrinth. The player navigates through a path carved throughout a grid but can only see their current location and the available paths by examining which viewscreen borders don't contain walls.

As the player traverses throughout the labyrinth, the background will become clearer as they approach a particular level's exit. Instructions for how to play can be found on the page of the game itself.

## A summary

The game runs on pure vanilla JS. No external libraries added.

All animations and drawings occur on the canvas, most of them using sigmoid functions to dictate rate of movement.

The background color is calculated using a flood-fill starting from the end and keeping count of the distance traveled to each node on the grid. This runs once upon loading a level. This allows distance to the end to be looked up while the player is traversing rather than have it recalculated on every move.