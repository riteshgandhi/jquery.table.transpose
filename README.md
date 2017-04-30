# jquery.table.transpose
This jquery plugin transposes html table. It has two modes 1) Horizontal and 2) Vertical

# Modes: 0 = Horizontal, 1 = Vertical
# Horizontal:-
When mode is set to Horizontal, plugin will transpose existing HTML table with horizontal headers to Vertical

# Vertical:-
When mode is set to Vertical, plugin will transpose existing HTML table with vertical headers to Horizontal

# Sample:
# //initialize plugin on table with horizontal headers
if (!$("#htable").is(":blk-transpose")){
  $("#htable").transpose({ mode: 0 });
}

# //initialize plugin on table with vertical headers
if (!$("#vtable").is(":blk-transpose")){
  $("#vtable").transpose({ mode: 1});
}

# //call Transpose method to transpose table
$("#htable").transpose("transpose");
$("#vtable").transpose("transpose");

# //call reset method to put the table back to original format
$("#htable").transpose("reset");
$("#vtable").transpose("reset");
