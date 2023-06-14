using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model.Entities;

public class Reward
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public long Id { get; set; }
    public TaskType Type { get; set; }
    public int level { get; set; }
    public DateTime Date { get; set; }
    public User Owner { get; set; }
}