using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model.Entities;

public class ToDo
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    
    public string TaskName { get; set; }
    public string? Description { get; set; }
    public DateTime Deadline { get; set; }
    public TaskType Type { get; set; }
    public int RewardPoint { get; set; }
    public bool Ready { get; set; }

}