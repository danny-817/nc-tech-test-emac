# Post Tech-test Notes

---

At this point I think its worth pointing out that I think there was an error with my source code. There are 2 files in the `data` folder which have different names but contain the same data. I think `sizes.json` should have contained some data relating the sizes (sm, md, lg, gt) in `cards.json` to the size titles (small, medium, large and giant). For that reason, i hardcoded the size titles into the `getSingleCard` function.

I ran out of time and didnt get the chance to finish what I was intending to do at the end. What I wanted to do was extract the logic from the `getAllCards` and `getSingleCard` that got the correct template and put it in a separate function.

I had started to do this earlier on and made a utilities folder and put the code in `getImageUrl.js` but it didnt work as I intended. I didn't want to lose too much time troubleshooting this so I left it to come back to. I think the problem was due to the asynchronus nature of the `getImageUrl` function when it was invoked with the `.map` in the `getAllCards` function. After a bit of research, i believe i could have solved this by putting the `.map` within a `Promise.all()`.

For the POST request, I would have set up more functions in the controller and model to handle that. The function in the controller would have needed various checks to ensure the data being posted was in the correct format. I would also need to implement checks to make sure that the the entry doesn't already exists before attempting to post it The `sizes`, `basePrice` and `pages.templateId` would all have needed checking to make sure they were valid. This would have also needed suitable testing to make sure you can't post data with missing information and invalid data types or values
