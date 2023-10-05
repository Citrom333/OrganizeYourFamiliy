using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace backend.Model.Entities;

public class ScheduledProgram
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string? Name { get; set; }
    public DateTime? Start { get; set; }
    public DateTime? End { get; set; }
    public decimal? Cost { get; set; }
    public List<User>? Participants { get; set; }
}