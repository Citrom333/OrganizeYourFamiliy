using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model.Entities;

public class ToDo
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    
    public string? TaskName { get; set; }
    public string? Description { get; set; }
    public DateTime? Deadline { get; set; }
    public ToDoType? Type { get; set; }
    public int? RewardPoint { get; set; }
    public bool Ready { get; set; }
    
    public User? Owner { get; set; }

}